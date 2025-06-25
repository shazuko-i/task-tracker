const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllTasks = async () => {
  return prisma.tb_task.findMany();
};

const createTask = async ({ name, description, status }) => {
  return prisma.tb_task.create({
    data: { name, description, status },
  });
};

const updateTask = async (id, data) => {
  return prisma.tb_task.update({
    where: { id: parseInt(id) },
    data,
  });
};

const deleteTask = async (id) => {
  return prisma.tb_task.delete({
    where: { id: parseInt(id) },
  });
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
