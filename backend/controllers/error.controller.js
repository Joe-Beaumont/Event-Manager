function handle404(req, res, next){
    res.status(404).send({msg: "Page does not exist"}) 
};

function handlePostgresErrors(err, req, res, next) {
  if (err.code === "22P02") {
    // invalid_text_representation (bad id format, wrong type, etc.)
    res.status(400).send({ msg: "Invalid input" });
  } else if (err.code === "23503") {
    // foreign_key_violation (user doesn’t exist for created_by)
    res.status(400).send({ msg: "Invalid User" });
  } else if (err.code === "23502") {
    // not_null_violation
    res.status(400).send({ msg: "Missing required field" });
  } else {
    next(err);
  }
}

function handleCustomErrors(err, req, res, next){
    if(err){
    res.status(err.status).send({msg: err.msg});
    }
    else {
        next(err);
    }
};

function handleServerErrors(err, req, res, next){
    res.status(500).send({msg: "Internal server error"});
};

module.exports = { handle404, handlePostgresErrors, handleCustomErrors, handleServerErrors };