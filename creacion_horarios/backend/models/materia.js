module.exports = (sequelize, DataType) => {
    const materia = sequelize.define('materia', {
      id_materia: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      codigo: {
        type: DataType.STRING(20),
        allowNulll: false,
      },      
      descripcion: {
        type: DataType.STRING(50),
        allowNulll: false,
      },
      fid_docente: {
        type: DataType.INTEGER,
        allowNull: false,
      },
    });  
    materia.associate = (models) => {
        materia.belongsTo(models.docente, { as: 'docente', foreignKey: {name: 'fid_docente', allowNull: false}});       
        materia.hasMany(models.horario, { as: 'materia', foreignKey: { name: 'fid_materia', allowNull: false } });
    }
  
    return materia;
  };