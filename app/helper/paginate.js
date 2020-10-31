exports.paginate=async(model,pagSize,pageLimit,search={},order=[],transform)=>{
    try{
        const limit=parseInt(pageLimit,10) || 10;
        const page=parseInt(pagSize,10) || 1;
        
        let options={
            offset:getOffset(page,limit),
            limit:limit
        }
        if(Object.keys(search).length)
        {
            options={options,...search}
        }
        if(order && order.length)
        {
            options['order'] = order;
        }
        let {count,rows}=await model.findAndCountAll(options)
        if(transform && typeof transform==='function')
        {
            rows=transform(rows)
        }
        return {
            previousPage: getPreviousPage(page),
            currentPage: page,
            nextPage: getNextPage(page, limit, count),
            total: count,
            limit: limit,
            data: rows
        }
    } 
    catch(err){
        console.log(err)
    }
}
const getOffset = (page, limit) => {
    return (page * limit) - limit;
   }
   
   const getNextPage = (page, limit, total) => {
       if ((total/limit) > page) {
           return page + 1;
       }
   
       return null
   }
   
   const getPreviousPage = (page) => {
       if (page <= 1) {
           return null
       }
       return page - 1;
   }