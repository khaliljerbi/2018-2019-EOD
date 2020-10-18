const authRouter = require('../routes/auth');
const userRouter = require('../routes/user');
const uploadRouter = require('../routes/upload');
const medRouter = require('../routes/med_reg');
const mailRouter = require('../routes/mail');
const logRouter = require('../routes/logRoute');
const parmRouter = require('../routes/parm');
const ambulanceRouter = require('../routes/ambulance');
const managementRouter = require('../routes/management');
const conversationRouter = require('../routes/conversation');
const errorHandler = require('../middlewares/error');

module.exports = (app) => {
  app.use('/api', uploadRouter);
  app.use('/api/ambulance', ambulanceRouter);
  app.use('/api/mail', mailRouter);
  app.use('/api/parm', parmRouter);
  app.use('/api/conversation', conversationRouter);
  app.use('/api/logs', logRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/users', userRouter);
  app.use('/api/med', medRouter);
  app.use('/api/management', managementRouter);
  app.use(errorHandler);
};
