
const Poll = require('./poll')

exports.createpollGetcontrolar = (req,res,next)=>{
    res.render('create')
}

exports.createpollPostcontrolar =async (req,res,next)=>{
    let {title,description,options} = req.body 
    
    options = options.map( opt =>{
        return {
            name : opt,
            vote : 0
        }
    })

    let poll = new Poll ({
        title,
        description,
        options
    })

    try{
        await poll.save()
        res.redirect('polls')

    }
    catch(e){
        console.log(e)
    }

}
exports.getpolls = async(req,res,next)=>{
    try{
        let polls = await Poll.find()
        res.render('polls',{polls})
    }
    catch(e){
        console.log(e)
    }
}

exports.viewpollgetcontrolar = async(req,res,next)=>{
    let id = req.params.id
    try{
        let poll = await Poll.findById(id)
        let options = [...poll.options]
        let result = []
        options.forEach(option =>{
            let persentag = (option.vote * 100) / poll.totalvote
            result.push({
                ...option._doc,
                persentag: persentag ? persentag : 0
             })
        })
        res.render('viewpoll',{poll,result})
    }
    catch(e){
        console.log(e)
    }
}


exports.viewpollpostcontrolar = async(req,res,next)=>{
    let id = req.params.id
    let optionsid = req.body.option
    try {
        let poll = await Poll.findById(id)

        let options = [...poll.options]
        let index = options.findIndex(o => o.id === optionsid)
        options[index].vote =options[index].vote +1

        let totalvote = poll.totalvote +1

        await Poll.findOneAndUpdate(
            {_id : poll._id},
            {$set : {options,totalvote}}
        )

        res.redirect('/polls/' + id) 
    }
    catch(e){
        console.log(e)
    }
}