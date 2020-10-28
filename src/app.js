const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid, v4 } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];
const initialLikes = 0;

app.get("/repositories", (request, response) => {
  // TODO
  try{
    return response.status(200).json(repositories);
  }catch(Error){
    return response.status(400).json({Error: 'Error'});
  }
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;

  const repository = { id: uuid(), title, url, techs, likes: initialLikes };

  try {
    repositories.push(repository);

    return response.status(200).json(repository);
  }catch(Error){
    return response.status(400).json({Error: 'Error'});
  }

});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex( repository => repository.id === id);
  const { title, url, techs } = request.body;
  try{

    const repository = { id, title, url, techs, likes: repositories[repositoryIndex].likes };
    if( repositoryIndex < 0){
      return response.status(400).json({ error: 'repostory not found!'})
    }
    repositories[repositoryIndex] = repository;
    return response.status(200).json(repository);
  }catch(Error){
    return response.status(400).json({ Error: 'Error'});
  }

});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex( repository=> repository.id === id);

  try{
    if( repositoryIndex < 0 ){
      return response.status(400).json({ error: 'Repository not found'});
    }
    repositories.splice(repositoryIndex, 1);
    return response.status(204).send();
  }catch(Error){
    return response.status(400).json({ Error: 'Error'});
  }
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex( repository => repository.id === id);

  try{
    if( repositoryIndex < 0){
      return response.status(400).json({ Error: 'Error'});
    }
    repositories[repositoryIndex].likes += 1;
    return response.status(200).json(repositories[repositoryIndex]);
  }catch(Error){
    return response.status(400).json({Error});
  }
});

module.exports = app;
