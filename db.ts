import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(
  'telegram_db',
  'tester',
  'Qwe1488dota',
  {
    host: '194.67.65.247',
    port: 5432,
    dialect: 'postgres'
  }
)
export default sequelize