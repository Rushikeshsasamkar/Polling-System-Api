*polling-API

How to run file

1. download zip file
2. extract zip file in your sytem
3. open file in VS code
4. open terminal in Vs code
5. run command npm i
6. run command nodemon index.js


How to call API

open PostMan Application and try running these commands

# for creating question  __localhost:8000/question/create__  method: POST 

# for deleting question  __localhost:8000/question/:id/delete__ method: GET  

# for creating option to question __localhost:8000/question/:id/options/create__ method: POST

# for showing full question with option __localhost:8000/question/:id__ method: GET

# for deleting a particular option __localhost:8000/option/:id/delete__ method: GET 

# for adding vote to option __localhost:8000/option/:id/add_vote__ method: POST



