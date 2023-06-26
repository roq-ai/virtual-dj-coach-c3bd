import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { categoryValidationSchema } from 'validationSchema/categories';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getCategories();
    case 'POST':
      return createCategory();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCategories() {
    const data = await prisma.category
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'category'));
    return res.status(200).json(data);
  }

  async function createCategory() {
    await categoryValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.course_category?.length > 0) {
      const create_course_category = body.course_category;
      body.course_category = {
        create: create_course_category,
      };
    } else {
      delete body.course_category;
    }
    const data = await prisma.category.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
