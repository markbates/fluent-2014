beforeEach ->
  @addMatchers
    toHaveBeenCalled: ->
      notText = if @isNot
        " not"
      else
        ""
      @message = ->
        "Expect #{@actual}() to#{notText} have been called."

      return @actual.called is true

    toHaveBeenCalledOnce: ->
      notText = if @isNot
        " not"
      else
        ""
      @message = ->
        "Expect #{@actual}() to#{notText} have been called once."

      return @actual.calledOnce is true

    toHaveBeenCalledWith: (etc...)->
      notText = if @isNot
        " not"
      else
        ""
      @message = ->
        args = etc.map (x)->
          JSON.stringify(x)
        .join(", ")
        "Expect #{@actual}() to#{notText} have been called with #{args}."

      @actual.calledWith(etc...)
