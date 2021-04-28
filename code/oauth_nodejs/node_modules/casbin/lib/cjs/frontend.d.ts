import { Enforcer } from './enforcer';
/**
 * Experiment!
 * getPermissionForCasbinJs returns a string describing the permission of a given user.
 * You can pass the returned string to the frontend and manage your webpage widgets and APIs with Casbin.js.
 * The returned permission depends on `getImplicitPermissionsForUser`.
 * In other words, getPermissionForCasbinJs will load all of the explicit and implicit permission (role's permission).
 * @param e the initialized enforcer
 * @param user the user
 */
export declare function casbinJsGetPermissionForUser(e: Enforcer, user: string): Promise<string>;
