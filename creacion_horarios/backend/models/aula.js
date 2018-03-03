module.exports = (sequelize, DataType) => { 
    const aula = sequelize.define('aula', {
      id_aula: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      codigo: {
        type: DataType.STRING(20), 
        allowNulll: false,
      },
      descripcion: {
        type: DataType.STRING(100),
        allowNulll: false,
      }
    });  
    aula.associate = (models) => {
      aula.hasMany(models.horario, { as: 'aula', foreignKey: { name: 'fid_aula', allowNull: false } });
    };
  
    return aula;
  };