const router = require('express').Router();
const auth = require('../middleware/auth');
const {
  createUserInfo,
  getUserInfos,
  getUserInfoById,
  updateUserInfo,
  deleteUserInfo
} = require('../controllers/userInfoController');

router.use(auth);

router.route('/')
  .post(createUserInfo)
  .get(getUserInfos);

router.route('/:id')
  .get(getUserInfoById)
  .put(updateUserInfo)
  .delete(deleteUserInfo);

module.exports = router;
