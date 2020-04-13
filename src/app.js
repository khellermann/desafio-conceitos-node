const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
    return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs, likes} = request.body;
  const repository = {
    id: uuid(),
    title, 
    url, 
    techs,
    likes: 1
  }
  repositories.push(repository);
  return response.status(200).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title, url, techs} = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  if(repositoryIndex<0){
    return res.status(400).json({error: "should not be able to update a repository that does not exist"})
  }
  
  const repository = {
    id,
    title, 
    url, 
    techs,
    likes: repositories[repositoryIndex].likes
  }
  repositories[repositoryIndex] = repository;
  return response.json(repository);
  
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  if(repositoryIndex<0){
    return response.status(400).json({error: "should not be able to delete a repository that does not exist"})
  }
  repositories.splice(repositoryIndex, 1);
  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  const {like = 1} = request.query;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

if(repositoryIndex<0){
    return response.status(400).json({error: "should not be able to like a repository that does not exist"})
  }
  
  repositories[repositoryIndex].likes =   repositories[repositoryIndex].likes +like;
  
  return response.json(repositories);
 


});

module.exports = app;
