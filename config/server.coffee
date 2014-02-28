# Define custom server-side HTTP routes for lineman's development server
#   These might be as simple as stubbing a little JSON to
#   facilitate development of code that interacts with an HTTP service
#   (presumably, mirroring one that will be reachable in a live environment).
#
# It's important to remember that any custom endpoints defined here
#   will only be available in development, as lineman only builds
#   static assets, it can't run server-side code.
#
# This file can be very useful for rapid prototyping or even organically
#   defining a spec based on the needs of the client code that emerge.
#
#
module.Posts = [
  {
    id: 1
    title: "This is Post #1"
    body: "This is some text I've put here for you to read."
    user_id: 1
    created_at: new Date(2014, 1, 1)
  },
  {
    id: 2
    title: "This is Post #2"
    body: "This is my great post about something. I hope you enjoy it."
    user_id: 1
    created_at: new Date(2014, 0, 27)
  }
]

module.Users = [
  {
    id: 1
    name: "Homer Simpson"
    username: "homer"
  }
]

module.DB =
  find: (table, id, col = 'id') ->
    obj = null
    for p in module[table]
      if p[col] is id
        obj = p
    return obj

  create: (table, obj) ->
    date = new Date()
    obj.id = date.getTime()
    obj.created_at = date
    module[table].push obj
    return obj

  destroy: (table, id, col ='id') ->
    obj = this.find(table, id, col)
    ind = module[table].indexOf(obj)
    module[table].splice(ind, 1)
    return obj

module.exports =
  drawRoutes: (app) ->
    app.get '/api/posts', (req, res) ->
      res.json(module.Posts)

    app.get '/api/posts/:id', (req, res) ->
      post = module.DB.find("Posts", parseInt(req.params.id))
      if post?
        res.json(post)

    app.put '/api/posts/:id', (req, res) ->
      post = module.DB.find("Posts", parseInt(req.params.id))
      for key, value of req.body
        post[key] = value
      console?.log "post", JSON.stringify(post)
      if post?
        res.json(post)
      else
        res.json(404, {error: "Post not found."})

    app.delete '/api/posts/:id', (req, res) ->
      obj = module.DB.destroy("Posts", parseInt(req.params.id))
      res.json(obj)

    app.post '/api/posts', (req, res) ->
      res.json(module.DB.create("Posts", req.body))

    app.get '/api/users/auth/:username', (req, res) ->
      user = module.DB.find("Users", req.params.username, 'username')
      if user?
        res.json(user)
      else
        res.json(401, {error: "User not found!"})

    app.get '/api/users/:id', (req, res) ->
      user = module.DB.find("Users", parseInt(req.params.id))
      if user?
        res.json(user)

