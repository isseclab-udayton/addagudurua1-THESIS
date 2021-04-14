// casbin package
const { newEnforcer } = require("casbin");

// importing policies from the enforcer
const enforcer = await newEnforcer('basic_model.conf', 'basic_policy.csv');

// adding en enforcement hook before the access happens

const sub = 'alice'; // the user that wants to access a resource.
const obj = 'data1'; // the resource that is going to be accessed.
const act = 'read'; // the operation that the user performs on the resource.

// Async:
const res = await enforcer.enforce(sub, obj, act);

if (res) {
    // permit alice to read data1
} else {
    // deny the request, show an error
}

