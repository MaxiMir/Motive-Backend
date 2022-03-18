INSERT INTO "users" ("id", "nickname", "name", "avatar", "email", "sub", "provider") VALUES
(2,	'sweet',	'Julia Z',	'/avatars/533f7340-e004-4e88-b18b-a23345ea86bb.webp',	'sweet@gmail.com',	'541',	'github'),
(3,	'evil',	'Emil Evil',	'/avatars/77b48896-6c7f-44ad-bfe0-c00b41b0c2d1.webp',	'evil@gmail.com',	'565',	'github'),
(4,	'arzunyan',	'Artyom Arzunyan',	'/avatars/918875ce-7adb-44c1-a698-7aaff9df327f.webp',	'arzunyan@gmail.com',	'234',	'github'),
(5,	'ulyanova',	'Valentina Ulyanova',	'/avatars/d5c266a3-b339-4125-8d8a-ad50282405fc.webp',	'ulyanova@gmail.com',	'642',	'github'),
(6,	'adventis',	'Matt Adventis',	'/avatars/ac9671ea-7820-4f9c-be49-118f9a49f319.webp',	'adventis@gmail.com',	'621',	'github'),
(7,	'kopeichik',	'Alex Kopeichik',	'/avatars/5cbbc687-35fa-4937-9aa1-8d68fb6e005a.webp',	'kopeichik@gmail.com',	'531',	'github'),
(1,	'maximir',	'Maxim Minchenko',	'https://avatars.githubusercontent.com/u/30494646?v=4',	'mmirrev@gmail.com',	'30494646',	NULL);

INSERT INTO "user-characteristics" ("id", "motivation_all", "creativity_all", "support_all", "motivation", "creativity", "support", "completed", "abandoned", "followers", "userId") VALUES
(5,	0,	0,	0,	1,	1,	1,	0,	0,	0,	5),
(6,	0,	0,	0,	1,	1,	1,	0,	0,	1,	6),
(7,	0,	0,	3,	1,	1,	1.02825530572988,	0,	0,	1,	7),
(4,	0,	0,	0,	1,	1,	1,	0,	0,	1,	4),
(2,	0,	0,	0,	1,	1,	1,	0,	0,	1,	2),
(3,	0,	0,	0,	1,	1,	1,	0,	0,	1,	3),
(1,	5,	0,	0,	1.0470921762164747,	1,	1,	2,	0,	0,	1);

INSERT INTO "goals" ("id", "name", "started", "hashtags", "stages", "stage", "ownerId", "completed") VALUES
(1,	'Make motivation app',	'2021-03-01 00:00:00+03',	'develop,motivation',	'Develop,Alpha testing,Registration,Production,Setting up ads',	0,	1,	'0'),
(2,	'Relocate to Portugal',	'2022-02-10 00:00:00+03',	'relocate,portugal',	'Increase income,Document preparation,Relocating',	0,	2,	'0'),
(3,	'Lead a sporty lifestyle',	'2022-02-19 00:00:00+03',	'health',	'',	0,	3,	'1');

INSERT INTO "goal-characteristics" ("id", "motivation", "creativity", "support", "members", "goalId") VALUES
(1,	0,	0,	0,	0,	1),
(2,	2,	3,	15,	4,	2),
(3,	52,	35,	21,	0,	3);


INSERT INTO "days" ("id", "date", "stage", "views", "topicCount", "goalId") VALUES
(1,	'2022-02-01 00:00:00+03',	0,	0,	0,	1),
(3,	'2022-02-02 00:00:00+03',	0,	0,	0,	1),
(4,	'2022-02-03 00:00:00+03',	0,	0,	0,	1),
(5,	'2022-02-05 00:00:00+03',	0,	0,	0,	1),
(6,	'2022-02-06 00:00:00+03',	0,	0,	0,	1),
(16,	'2022-02-13 00:00:00+03',	0,	0,	0,	1),
(7,	'2022-02-07 00:00:00+03',	0,	0,	0,	1),
(8,	'2022-02-08 00:00:00+03',	0,	0,	0,	1),
(9,	'2022-02-09 00:00:00+03',	0,	0,	0,	1),
(11,	'2022-02-10 00:00:00+03',	0,	0,	0,	1),
(13,	'2022-02-11 00:00:00+03',	0,	0,	0,	1),
(14,	'2022-02-12 00:00:00+03',	0,	0,	0,	1),
(18,	'2022-02-15 00:00:00+03',	0,	0,	0,	1),
(19,	'2022-02-16 00:00:00+03',	0,	0,	0,	1),
(22,	'2022-02-28 00:00:00+03',	0,	17,	0,	1),
(17,	'2022-02-14 00:00:00+03',	0,	1,	0,	1),
(20,	'2022-02-17 00:00:00+03',	0,	49,	0,	1),
(12,	'2022-02-11 00:00:00+03',	0,	42,	0,	3),
(25,	'2022-03-15 00:00:00+03',	0,	0,	0,	1),
(2,	'2022-03-08 00:00:00+03',	0,	778,	7,	2),
(10,	'2022-02-10 00:00:00+03',	0,	52,	0,	3),
(26,	'2022-03-14 00:00:00+03',	0,	312,	0,	2);

INSERT INTO "day-characteristics" ("id", "motivation", "creativity", "support", "dayId") VALUES
(2,	1,	1,	0,	26),
(1,	1,	2,	15,	2);

INSERT INTO "feedback" ("id", "text", "photos", "video", "dayId") VALUES
(4,	'A modal window has been added. To work with forms, I use formik.org. And for their validation yup.

I also added rest for backend.
',	'[{"src":"/feedback/83874123-cec8-4ee2-8b4e-a07a69aade01.webp","width":163,"height":115}]',	'',	4),
(1,	'For tomorrow''s tasks it is necessary to lock the task checkboxes and "Finish the day" button',	'[{"src":"/feedback/a2ee7607-2f08-4efd-9a28-f85b5964c44d.webp","width":146,"height":91}]',	'',	1),
(8,	'Large goals can be divided into stages. There will be a button underneath all of the steps to complete the step.

Once all steps are completed, there will be a button to complete the goal.',	'[{"src":"/feedback/c1a7c64f-c07f-4317-8764-504c2990d786.webp","width":585,"height":407}]',	NULL,	7),
(2,	'I decided to use markdown on the frontend. The text with the link is converted into a link using a regular expression.

Pictures are reduced to 1280px and converted to webp on the backend. To display on the front I calculate the aspect ratio and save it in the database.',	'[{"src":"/feedback/452696cd-ed12-436a-a567-0f22f9156e60.webp","width":428,"height":403}]',	'',	3),
(5,	'Goals that are not filled for more than 14 days are covered by the web. On the 28th day they must be removed.

I have not yet implemented the deletion logic on the backend.',	'[{"src":"/feedback/ae863802-3c4e-421a-98c0-1bda5adbe8d4.webp","width":108,"height":65}]',	'',	5),
(6,	'I''m a lazy ass. I didn''t do anything 🤪',	NULL,	NULL,	2),
(7,	'I added a modal window and rest on the backend. I''ve added explanation boxes for Old Pitt and for dividing large goals into stages.',	'[{"src":"/feedback/3a24c186-566e-4b1d-b532-012c569e675e.webp","width":473,"height":854}]',	NULL,	6),
(11,	'I spent five hours looking for this one. In the end, the solution for finding the link looks like this 🤣:',	'[{"src":"/feedback/0b62a8c8-74c9-4b9b-8db5-bb07d163d393.webp","width":1221,"height":559}]',	NULL,	8),
(12,	'In the modal window for the rocket added animation with takeoff. Implemented rest on the backend.',	'[{"src":"/feedback/4f2082d0-c69d-4d64-b208-159b87720b55.webp","width":478,"height":463}]',	NULL,	9),
(13,	'I do it',	NULL,	NULL,	10),
(23,	'I added animations for the photos 📸. Also added a rest on the backend .

The repeat button does not work yet.',	'[{"src":"/feedback/9b2e1a1c-dc49-4ca0-8544-3fdc85d7edbf.webp","width":455,"height":848}]',	NULL,	19),
(14,	'I spent a long time browsing the 🎮  forums looking for an algorithm to calculate the experience. As a result, I found the most suitable one and modified the coefficients.',	'[{"src":"/feedback/9113c8f4-145a-41d7-8b73-baef9c2aa729.webp","width":52,"height":63},{"src":"/feedback/e0c6eed5-0d1b-4440-96dc-b612473790fe.webp","width":549,"height":443}]',	NULL,	11),
(15,	'I overslept 🤣',	NULL,	NULL,	12),
(16,	'A report has been added for discussion messages and for goals',	'[{"src":"/feedback/b6ad9c6c-a4c5-45ff-b6ba-b9579e66937a.webp","width":98,"height":157}]',	NULL,	13),
(18,	NULL,	'[{"src":"/feedback/d3069a3d-562a-4d36-a5dc-1a3c1b5eefba.webp","width":215,"height":302}]',	NULL,	14),
(24,	'The task was delayed for a week. It wasn''t easy 😮‍💨. On the authorization front I use https://next-auth.js.org/.

Implemented only for GitHub.',	'[{"src":"/feedback/3e384c43-02d0-4242-98a2-2d74159377e6.webp","width":58,"height":33}]',	NULL,	20),
(25,	'Added user id to queries. For instance:',	'[{"src":"/feedback/bf601073-c57f-4380-a41e-98fc8456ddb7.webp","width":86,"height":13}]',	NULL,	22),
(27,	NULL,	'[{"src":"/feedback/01207470-db46-45f8-8125-c83388785735.webp","width":27,"height":26}]',	NULL,	25),
(21,	'Also added processing on the backend',	'[{"src":"/feedback/58e35db0-3cb2-4d74-8e3a-691b2a929136.webp","width":233,"height":295}]',	NULL,	17),
(19,	'Updated the formula for calculating experience: (x * step) ^ coefficient',	'[{"src":"/feedback/68509a10-99fd-439c-8b5a-22ccc6546a0c.webp","width":959,"height":890}]',	NULL,	16),
(22,	'After closing the modal window made a scroll to the characteristics of the user and then update them with animation.',	'[{"src":"/feedback/710a159a-d207-4f30-a1b6-9dfcc28fcddb.webp","width":455,"height":566}]',	NULL,	18);

INSERT INTO "topics" ("id", "date", "likeCount", "text", "type", "parentId", "goalId", "edited", "userId", "answerId", "dayId") VALUES
(4,	'2022-02-21 09:25:45.700587+03',	15,	'I think about 2-3 years ',	'answer',	3,	2,	'1',	2,	NULL,	2),
(6,	'2022-03-08 02:11:36.79269+03',	0,	'You have to be strong now, my love one! 🙏',	'support',	NULL,	2,	'0',	1,	NULL,	2),
(5,	'2022-02-22 19:02:19.179939+03',	0,	'What are you? 👨‍💻',	'question',	NULL,	2,	'0',	4,	NULL,	2),
(7,	'2022-03-11 16:55:25.630642+03',	1,	'Portugal is closed. Any other options? 🗺',	'question',	NULL,	2,	'0',	6,	NULL,	2),
(2,	'2022-02-21 09:21:58.796886+03',	49,	'It''s all going to work out! I believe it! 🦹‍♂️',	'support',	NULL,	2,	'0',	7,	NULL,	2),
(1,	'2022-02-21 09:03:34.691207+03',	2,	'Why Portugal? 🇵🇹🇵🇹🇵🇹',	'question',	NULL,	2,	'0',	3,	NULL,	2),
(3,	'2022-02-21 09:23:50.20186+03',	5,	'How long do you think it will take?',	'question',	NULL,	2,	'0',	5,	4,	2);

INSERT INTO "likes" ("id", "uniq", "topicId", "userId") VALUES
(89,	'1:4',	4,	1),
(90,	'1:2',	2,	1),
(91,	'1:1',	1,	1),
(92,	'1:7',	7,	1),
(93,	'1:3',	3,	1);

INSERT INTO "members" ("id", "uniq", "completedTasks", "goalId", "userId", "dayId", "lastEndOfDay", "started") VALUES
(78,	'1:2',	'{}',	2,	1,	26,	NULL,	'2022-03-18 00:00:00+03');



INSERT INTO "reactions" ("id", "characteristic", "uniq", "goalId", "dayId", "userId") VALUES
(15,	'motivation',	'1:26:motivation',	2,	26,	1),
(16,	'creativity',	'1:26:creativity',	2,	26,	1),
(1,	'creativity',	'1:2:creativity',	2,	2,	1),
(2,	'motivation',	'1:2:motivation',	2,	2,	1);

INSERT INTO "subscription" ("id", "uniq", "userId", "followerId") VALUES
(1,	'1:2',	1,	2),
(2,	'1:3',	1,	3),
(5,	'7:1',	7,	1),
(6,	'4:1',	4,	1),
(12,	'6:1',	6,	1),
(13,	'3:1',	3,	1),
(14,	'2:1',	2,	1);

INSERT INTO "tasks" ("id", "name", "date", "completed", "completedByOther", "dayId", "userId") VALUES
(25,	'Add "Where do we start from"?',	NULL,	'1',	'1',	25,	1),
(10,	'Do 60 pushups',	NULL,	'1',	'1',	10,	1),
(2,	'Watch videos to improve skills',	NULL,	'1',	'1',	2,	2),
(26,	'Searching for alternatives',	NULL,	'0',	'1',	26,	2),
(4,	'Add a "Adding tasks for tomorrow"',	NULL,	'0',	'0',	4,	1),
(5,	'Add Old Pitt''s web for abandoned goals',	NULL,	'0',	'0',	5,	1),
(6,	'Add "Creating a new goal"',	NULL,	'0',	'0',	6,	1),
(7,	'Add stages',	NULL,	'0',	'0',	7,	1),
(8,	'Find a regular expression to search for links',	NULL,	'0',	'0',	8,	1),
(9,	'Add "Completion stage"',	NULL,	'0',	'0',	9,	1),
(11,	'Add "Completing the goal"',	NULL,	'0',	'0',	11,	1),
(12,	'Get up at 6:00 a.m.',	NULL,	'0',	'0',	12,	1),
(13,	'Make report',	NULL,	'0',	'0',	13,	1),
(14,	'Make a discussion',	NULL,	'0',	'0',	14,	1),
(16,	'Change the experience calculation',	NULL,	'0',	'0',	16,	1),
(17,	'Add "Support User"',	NULL,	'0',	'0',	17,	1),
(18,	'Add "Completing the goal"',	NULL,	'0',	'0',	18,	1),
(19,	'Add "Completed goals"',	NULL,	'0',	'0',	19,	1),
(20,	'Add auth',	NULL,	'0',	'0',	20,	1),
(22,	'Add a check for rests on the owner of the goal',	NULL,	'0',	'0',	22,	1),
(1,	'Disable new checkboxes and button until the next day',	NULL,	'0',	'0',	1,	1),
(3,	'Add feedback',	NULL,	'0',	'0',	3,	1);

INSERT INTO "confirmations" ("id", "text", "photos", "video", "started", "end", "goalId", "userId", "inherited") VALUES
(1,	'It wasn''t easy at all. But I did it! 🦹‍♂️',	'[{"src":"/confirmation/6f5d408d-bf37-4f82-9ab7-9b7a0f90b324.webp","width":3,"height":4}]',	NULL,	'2022-02-19 00:00:00+03',	'2022-02-21 00:00:00+03',	3,	1,	'1');
