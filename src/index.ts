import { DangerDSLType } from "danger/distribution/dsl/DangerDSL"
import { checkPRReviewers } from "./rules/checkReviewers"
declare var danger: DangerDSLType
export declare function message(message: string): void
export declare function warn(message: string): void
export declare function fail(message: string): void
export declare function markdown(message: string): void

/**
 * Wrapper of dangerjs in ts
 */

const checkChangedFiles = (limit = 10) => {
  const addedFilesAmount = danger.git?.created_files?.length || 0
  const changedFilesAmount = danger.git?.modified_files?.length || 0
  const deletedFilesAmount = danger.git?.deleted_files?.length || 0
  const filesChanged = addedFilesAmount + changedFilesAmount + deletedFilesAmount
  if (filesChanged > limit) {
    warn(`Files changed in this PR are ${filesChanged}!!. Limit is ${limit} ;) 2`)
  }
}

const checkTicketLinkInPrBoby = () => {
  const ticketRegExp = /AB#[0-9]{5}/g
  if (!danger.github?.pr?.body.match(ticketRegExp)) {
    return fail("Add the ticket for this PR at the PR body  2")
  }
}

const checkNewDependencies = () => {
  if (danger.git?.modified_files?.includes("package.json")) {
    warn("This PR contains new/updated dependencies. Remember execute npm i before testing the PR! 2")
  }
}

const checkUpdatedTests = (testFilePattern = "test") => {
  const addedFiles = danger.git.created_files || []
  const changedFiles = danger.git.modified_files || []
  const testFilesUpdated = [...addedFiles, ...changedFiles].filter(filepath => filepath.includes(testFilePattern))

  if (testFilesUpdated.length === 0) {
    warn(`There are no changes in test files. Pattern used: ${testFilePattern} 2`)
  }
}

export default function() {
  checkPRReviewers()
  checkChangedFiles()
  checkTicketLinkInPrBoby()
  checkNewDependencies()
  checkUpdatedTests()
}
