import {checkPRReviewers, wrapperTs} from "./index"

declare const global: any

describe("wrapperTs()", () => {
  beforeEach(() => {
    global.warn = jest.fn()
    global.message = jest.fn()
    global.fail = jest.fn()
    global.markdown = jest.fn()
  })

  afterEach(() => {
    global.warn.mockClear()
    global.message.mockClear()
    global.fail.mockClear()
    global.markdown.mockClear()
  })

  it("Checks for a that message has been called", () => {
    global.danger = {
      github: { pr: { title: "My Test Title" } },
    }
    wrapperTs()
    expect(global.message).toHaveBeenCalledWith(
      "PR Title: My Test Title",
    )
  })

  it("fails if there are no asignees on the PR", () => {
    global.danger = {github : { requested_reviewers: { users: []}} }
    checkPRReviewers()
    expect(global.fail).toHaveBeenCalled()
  })
})
