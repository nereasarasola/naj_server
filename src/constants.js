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
const FORBIDDEN = 'FORBIDDEN';
const UNAUTHORIZED = 'UNAUTHORIZED';
const MESSAGE = "Failed making the req: ";
const FORBIDDEN_MESSAGE = 'Expired token';
const UNAUTHORIZED_MESSAGE = 'Unauthorized token';
const MISSING_EMAIL= "One of the following keys is missing or is empty in request body:'email'";
const MISSING_NAME_EMAIL = "One of the following keys is missing or is empty in request body: 'name', 'email'";
const INCORRENCT_EMAIL = "Incorrect email";
const INCORRENCT_TOKEN = 'Incorrect token';
const INCORRECT_DATA = 'Incorrect data';
const ERROR404 = "Error 404";
const POISON_ALL_ERROR = 'poison_all_error';

//Sockets
const NEW_CONNECTION = 'new_connection';
const NEW_CONNECTION_ERROR = 'new_connectionError';
const NEW_USER = 'new_user';
const NEW_USER_ERROR = 'new_userError';
const DISCONNECTION = 'disconnect';
const ACOLITE_STATE = 'acolite_state';
const ACOLITE_STATE_ERROR = 'acolite_stateError'
const ACOLITE_DETAILS = "acolite_details";
const SCANNED_ACOLITE = "scanned_acolite";
const SCANNED_ACOLITE_ERROR = "scanned_acoliteError";
const MISSION_STATUS = 'missionStatus';
const MISSION_STATUS_ERROR = 'missionStatusError';
const DOLL_DETAILS = 'doll_details';
const DOLL_DETAILS_ERROR = 'doll_detailsError';
const POISON_ALL = 'poison_all';
const UPDATE_TO_NOT_FOUND_DOLLS = 'update_to_not_found_dolls';
const UPDATE_TO_NOT_FOUND_DOLLS_ERROR = 'error updating dolls';
const REFRESH_VALIDATION = 'refresh_validation';





module.exports = {
    PROJECT_ID,
    STARTED,
    STATUS,
    UNAUTHORIZED,
    FORBIDDEN,
    MESSAGE,
    FORBIDDEN_MESSAGE,
    UNAUTHORIZED_MESSAGE,
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
    NEW_CONNECTION_ERROR,
    NEW_USER,
    NEW_USER_ERROR,
    DISCONNECTION,
    ACOLITE_STATE,
    ACOLITE_STATE_ERROR,
    ACOLITE_DETAILS,
    MISSION_STATUS,
    MISSION_STATUS_ERROR,
    DOLL_DETAILS,
    DOLL_DETAILS_ERROR,
    SCANNED_ACOLITE,
    SCANNED_ACOLITE_ERROR,
    POISON_ALL,
    POISON_ALL_ERROR,
    UPDATE_TO_NOT_FOUND_DOLLS,
    REFRESH_VALIDATION
}