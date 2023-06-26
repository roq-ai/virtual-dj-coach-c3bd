import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { courseCategoryValidationSchema } from 'validationSchema/course-categories';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.course_category
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getCourseCategoryById();
    case 'PUT':
      return updateCourseCategoryById();
    case 'DELETE':
      return deleteCourseCategoryById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCourseCategoryById() {
    const data = await prisma.course_category.findFirst(convertQueryToPrismaUtil(req.query, 'course_category'));
    return res.status(200).json(data);
  }

  async function updateCourseCategoryById() {
    await courseCategoryValidationSchema.validate(req.body);
    const data = await prisma.course_category.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteCourseCategoryById() {
    const data = await prisma.course_category.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
