

module.exports=(sequelize,Sequelize)=>{
    const Day=sequelize.define('days',{
        isAvailableOnSunday:{
            type:Sequelize.BOOLEAN
        },
        SunFromTime:{
            type:Sequelize.TIME
        },
        SunToTime:{
            type:Sequelize.TIME
        },
        isAvailableOnMonday:{
            type:Sequelize.BOOLEAN
        },
        MonFromTime:{
            type:Sequelize.TIME
        },
        MonToTime:{
            type:Sequelize.TIME
        },
        isAvailableOnTuesday:{
            type:Sequelize.BOOLEAN
        },
        TueFromTime:{
            type:Sequelize.TIME
        },
        TueToTime:{
            type:Sequelize.TIME
        },
        isAvailableOnWednesday:{
            type:Sequelize.BOOLEAN
        },
        WedFromTime:{
            type:Sequelize.TIME
        },
        WedToTime:{
            type:Sequelize.TIME
        },
        isAvailabelOnThursday:{
            type:Sequelize.BOOLEAN
        },
        ThuToTime:{
            type:Sequelize.TIME
        },
        ThuFromTime:{
            type:Sequelize.TIME
        },
        isAvailabelOnFriday:{
            type:Sequelize.BOOLEAN
        },
        FriFromTime:
        {
            type:Sequelize.TIME
        },
        FriToTime:{
            type:Sequelize.TIME
        },
        isAvailabelOnSaturday:{
            type:Sequelize.BOOLEAN
        },
        SatFromTime:{
            type:Sequelize.TIME
        },
        SatToTime:{
            type:Sequelize.TIME
        },
        doctorId:{
            type:Sequelize.INTEGER,
            references: {
              model: 'doctors',
              key: 'id'
          },
        }

        

        
    })
    return Day;
}