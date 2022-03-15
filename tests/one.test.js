const listHelper = require("../utils/list_helper");

const blogs = [
  {
    user_id: "123456",
    site_id: "987654321",
    post_id: "528036988357777409",
    post_title: "My New Blog Post",
    post_created_date: "2017-10-03 11:58:06",
    created_date: 1402964756,
  },
  {
    user_id: "123456",
    site_id: "987654321",
    post_id: "648291276105250798",
    post_title: "Another Blog Post",
    post_created_date: "2013-09-06 09:57:04",
    created_date: 1378504674,
  },
  {
    user_id: "123456",
    site_id: "987654321",
    post_id: "489389593268427583",
    post_title: "Travel Blog Post",
    post_created_date: "2013-09-06 07:00:00",
    created_date: 1378504578,
  },
];

test("one", () => {
  const result = listHelper.dummy(blogs);

  expect(result).toBe(1);
});
