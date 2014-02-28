beforeEach ->
  @functionSpy = (object, functionName) =>
    if object[functionName]?
      spy = @sandbox.stub(object, functionName)
    else
      object[functionName] = ->
      spy = @sandbox.spy(object, functionName)
    object["#{functionName}Spy"] = spy
    return spy
