"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB_1 = __importDefault(require("./config/connectDB"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const websocket_1 = __importDefault(require("./websocket"));
const logger_1 = require("./middleware/logger");
//routes
const register_1 = __importDefault(require("./routes/register"));
const login_1 = __importDefault(require("./routes/login"));
const logout_1 = __importDefault(require("./routes/logout"));
const refresh_1 = __importDefault(require("./routes/refresh"));
const chat_1 = __importDefault(require("./routes/chat"));
const user_1 = __importDefault(require("./routes/user"));
//connecting to DB
(0, connectDB_1.default)();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const PORT = 3000;
//middlewares
const verifyJWT_1 = __importDefault(require("./middleware/verifyJWT"));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(logger_1.logger);
//Routes
app.use('/register', register_1.default);
app.use('/login', login_1.default);
app.use('/logout', logout_1.default);
app.use('/refresh', refresh_1.default);
app.use(verifyJWT_1.default); // Use to Authenticate our http endpoints
app.use('/chat', chat_1.default);
app.use('/user', user_1.default);
app.get('/helloworld', (req, res) => {
    res.send("Hello World");
});
(0, websocket_1.default)(server);
mongoose_1.default.connection.once('open', () => {
    console.log('Connected to mongoDB');
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
