module.exports = (sequelize, DataType) => {
    const horario = sequelize.define('horario', {
      id_horario: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      dia: {
        type: DataType.STRING(30),
        allowNulll: false,
      },
      hora_inicio: {
        type: DataType.TIME,
        allowNulll: false,
      },
      hora_final: {
        type: DataType.TIME,
        allowNulll: false,
      },
      fid_materia: {
        type: DataType.INTEGER,
        allowNull: false,
      },
      fid_aula: {
        type: DataType.INTEGER,
        allowNull: false,
      },
    });
  
    horario.associate = (models) => {
        horario.belongsTo(models.aula, { as: 'aula', foreignKey: {name: 'fid_aula', allowNull: false}});
        horario.belongsTo(models.materia, { as: 'materia', foreignKey: {name: 'fid_materia', allowNull: false}});
    }
  
    return horario;
  };