import {DangerDSLType} from "danger/distribution/dsl/DangerDSL"

declare var danger: DangerDSLType
export declare function message(message: string): void
export declare function warn(message: string): void
export declare function fail(message: string): void
export declare function markdown(message: string): void

export const checkPRReviewers = () => {
  if (danger.github.requested_reviewers?.users.length === 0) {
    return fail("PR must have at least 1 reviewer!! 2")
  }
}
