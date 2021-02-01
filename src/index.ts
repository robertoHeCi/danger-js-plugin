// Provides dev-time type structures for  `danger` - doesn't affect runtime.
import {DangerDSLType} from "danger/distribution/dsl/DangerDSL"
declare var danger: DangerDSLType
export declare function message(message: string): void
export declare function warn(message: string): void
export declare function fail(message: string): void
export declare function markdown(message: string): void

/**
 * Wrapper of dangerjs in ts
 */
export default function wrapperTs() {
  // Replace this with the code from your Dangerfile
  const title = danger.github.pr.title
  message(`PR Title: ${title}`)
}
