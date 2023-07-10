const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path');

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

    let media= [
      {
        "adult": false,
        "backdrop_path": "/pQHg2NZpS5kvoENFMSt0ynzCFqd.jpg",
        "id": 114472,
        "name": "Secret Invasion",
        "original_language": "en",
        "original_name": "Secret Invasion",
        "overview": "Nick Fury and Talos discover a faction of shapeshifting Skrulls who have been infiltrating Earth for years.",
        "poster_path": "/3rINdUPSy9AklJg74jWHOyUXuZd.jpg",
        "media_type": "tv",
        "genre_ids": [
          10759,
          18,
          10765
        ],
        "popularity": 2163.051,
        "first_air_date": "2023-06-21",
        "vote_average": 7.878,
        "vote_count": 156,
        "origin_country": [
          "US"
        ],
        "genreNames": [
          "Action & Adventure",
          "Drama",
          "Sci-Fi & Fantasy"
        ]
      },
    ]
  
    app.get('/', (request, response) => {
        response.send('<h1>Hello World!</h1>')
      })
      
      app.get('/api/media', (request, response) => {
        response.json(media)
      })

      app.get('/api/media/:id',(request,response)=>{
        const id=Number(request.params.id);
        const returnMedia=media.find(media=>media.id===id);
        if(returnMedia){
            response.json(returnMedia)
        }
        else{
            response.status(404).end()
        }
      })

      app.delete('/api/media/:id',(request,response)=>{
        const id=Number(request.params.id)
        media=media.filter(mediaItem=>mediaItem.id!==id)

        response.status(204).end();
      })

      app.delete('/api/media',(request,response)=>{
        media=[];
        response.status(204).end();
      })

      app.post('/api/media', (request, response) => {
      
        const newMedia = request.body
      
        media = media.concat(newMedia)
      
        response.json(newMedia)
      })

      app.get('/Movies', function(req, res) {
        res.sendFile(path.join(__dirname, 'build/index.html'), function(err) {
          if (err) {
            res.status(500).send(err)
          }
      })
      })

      app.get('/tvshows', function(req, res) {
        res.sendFile(path.join(__dirname, 'build/index.html'), function(err) {
          if (err) {
            res.status(500).send(err)
          }
      })
      })
      
      const PORT = process.env.PORT || 3002
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
      })

