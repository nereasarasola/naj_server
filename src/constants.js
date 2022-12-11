//Middleware
const PROJECT_ID = 'auth-cc-naj';

//Doll
const STARTED = 'started';

//User
const AWAKE = 'awake';
const SLEEP = 'sleep';
const EXHAUSTED = 'exhausted';
const FAINTED = 'fainted';

//Error message
const STATUS = 'FAILED';
const MESSAGE = "Failed making the req: ";
const MISSING_EMAIL= "One of the following keys is missing or is empty in request body:'email'";
const MISSING_NAME_EMAIL = "One of the following keys is missing or is empty in request body: 'name', 'email'";
const INCORRENCT_EMAIL = "Incorrect email";
const INCORRENCT_TOKEN = 'Incorrect token';
const INCORRECT_DATA = 'Incorrect data';
const ERROR404 = "Error 404";

//Sockets
const NEW_CONNECTION = 'new_connection';
const DISCONNECTION = 'disconnect';
const ACOLITE_STATE = 'acolite_state';
const ACOLITE_STATE_ERROR = 'acolite_stateError'
const ACOLITE_DETAILS = "acolite_details";



module.exports = {
    PROJECT_ID,
    STARTED,
    STATUS,
    MESSAGE,
    MISSING_NAME_EMAIL,
    MISSING_EMAIL,
    INCORRENCT_EMAIL,
    INCORRENCT_TOKEN,
    INCORRECT_DATA,
    AWAKE,
    SLEEP,
    EXHAUSTED,
    FAINTED,
    ERROR404,
    NEW_CONNECTION,
    DISCONNECTION,
    ACOLITE_STATE,
    ACOLITE_STATE_ERROR,
    ACOLITE_DETAILS,
}