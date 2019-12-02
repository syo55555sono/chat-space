# README

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|username|string|null: false|
|email|string|null: false|
|password|string|null: false|
### Association
- has_many :posts
- has_many :groups

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|groupname|string|null: false|
|user_id|integer|null false, foreign_key: true|
### Association
- has_many :groups_users
- has_many :posts*******

## postsテーブル
Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|image|integer||
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user