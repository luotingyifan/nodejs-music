-- ----------------------------
--  Table structure for `music_code`
-- ----------------------------
DROP TABLE IF EXISTS `music_code`;
CREATE TABLE `music_code`
(
  `id`          int(11) NOT NULL AUTO_INCREMENT,
  `v_code`      varchar(4) NOT NULL DEFAULT '' COMMENT '验证码',
  `create_date` datetime   NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


-- ----------------------------
--  Table structure for `music_mail_code`
-- ----------------------------
DROP TABLE IF EXISTS `music_mail_code`;
CREATE TABLE `music_mail_code`
(
  `id`            int(11) NOT NULL AUTO_INCREMENT,
  `receive_email` varchar(255) NOT NULL COMMENT '接收邮箱',
  `v_code`        varchar(6)   NOT NULL DEFAULT '' COMMENT '验证码',
  `create_date`   datetime     NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


-- ----------------------------
--  Table structure for `music_user`
-- ----------------------------
DROP TABLE IF EXISTS `music_user`;
CREATE TABLE `music_user`
(
  `id`            int(11) NOT NULL AUTO_INCREMENT,
  `user_name`     varchar(255) NOT NULL DEFAULT '' COMMENT '用户名',
  `user_email`    varchar(255) NOT NULL COMMENT '用户邮箱',
  `user_password` varchar(255) NOT NULL COMMENT '用户密码',
  `create_date`   datetime     NOT NULL COMMENT '创建时间',
  `update_date`   datetime     NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `music_user`
-- ----------------------------
INSERT INTO `music_user`(`user_name`, `user_email`, `user_password`, `create_date`, `update_date`)
VALUES ('admin', 'luoting@mcpayment.net', '96e79218965eb72c92a549dd5a330112', now(), now());
COMMIT;
