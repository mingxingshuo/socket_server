var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var connect_url = require('../conf/proj.json').mongodb;
var db = mongoose.createConnection(connect_url); 

var UserSchema = new Schema({
  openid: String,
  code:String,
  fatherid:String,                             //父id
  hostid:String,                               //主id
  rebate:{ type: Number, default:0},          //购买返利
  friend_rebate:{ type: Number, default:0},  //好友返利
  friend:Array,                                //所有好友
  valid_friend:Array,                         //有效好友
  nickname: String,
  unionid:String,
  sex: String,
  province: String,
  city: String,
  country: String,
  headimgurl: String,
  all_count : { type: Number, default:0} ,
  finished_count : { type: Number, default:0},
  unfinished_count : { type: Number, default:0},
  current_balance : { type: Number, default:0},
  addup_cash : { type: Number, default:0},
  auction:{ type: Number, default:0},
  action_time:Number,
  referee:String,
  createAt: {
      type: Date,
      default: Date.now
  },
  updateAt: {
      type: Date,
      default: Date.now
  }
},{
    timestamps: { createdAt: 'createAt', updatedAt: 'updateAt' }
});

UserSchema.statics = {
    fetch(id,codes, cb) {
        if (id) {
            return this.find({_id: {$lt: id},code:{$in:codes}})
                .limit(50)
                .sort({'_id':-1})
                .exec(cb);
        }else {
            return this.find({code:{$in:codes}})
                .limit(50)
                .sort({'_id':-1})
                .exec(cb);
        }
    },
    fetch_openid(id,code,cb){
        if (id) {
            return this.find({_id: {$lt: id},code:code}, ['openid'])
                .limit(50)
                .sort({'_id':-1})
                .exec(cb);
        }else {
            return this.find({code:code}, ['openid'])
                .limit(50)
                .sort({'_id':-1})
                .exec(cb);
        }
    },
    fetch_nickname(id,code,cb){
        if (id) {
            return this.find({_id: {$lt: id},code:code,nickname:""||null}, ['openid'])
                .limit(50)
                .sort({'_id':-1})
                .exec(cb);
        }else {
            return this.find({code:code,nickname:""||null}, ['openid'])
                .limit(50)
                .sort({'_id':-1})
                .exec(cb);
        }
    }
}

var UserModel = db.model('User', UserSchema);

module.exports = UserModel;