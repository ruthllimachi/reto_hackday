module.exports = (sequelize, DataType) => { 
    const docente = sequelize.define('docente', {
      id_docente: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombres: {
        type: DataType.STRING(100), 
        allowNulll: false,
      },
      apellidos: {
        type: DataType.STRING(100),
        allowNulll: false,
      }
    });
  
    docente.associate = (models) => {
      docente.hasMany(models.materia, { as: 'docente', foreignKey: { name: 'fid_docente', allowNull: false } });
    };
  
    return docente;
  };