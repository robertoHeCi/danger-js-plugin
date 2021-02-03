import {checkPRReviewers} from "./checkReviewers"

declare const global: any

describe("Check reviewers tests", () => {
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

  it("fails if there are no asignees on the PR", () => {
    global.danger = {github: {requested_reviewers: {users: []}}}
    checkPRReviewers()
    expect(global.fail).toHaveBeenCalled()
  })
})
