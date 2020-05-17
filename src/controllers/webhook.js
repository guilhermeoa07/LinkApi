exports.post = (req, res, next) => {
  const status = req.body.current.status

  console.log(req.body)

  res.status(201).send({
    "message": 'Requisição recebida com sucesso!',
    body: req.body
  })
}
