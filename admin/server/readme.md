python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install flask flask-cors pymongo flask-jwt-extended

deactivate

pip install -r requirements.txt

// **Total Users Trend API (users/total_users_trend):**
This API calculates the total number of registered users in Flashcode and tracks user growth trends. It fetches the total count of users and compares the number of new users in the current month to the previous month. Based on this comparison, it determines the percentage change and assigns a trend such as "Growing community" or "User drop detected." The API also includes an icon indicator ("up" for growth, "down" for decline).

**Total Questions Trend API (questions/total_questions_trend):**
This API tracks the number of questions posted on Flashcode. It retrieves the total number of questions and calculates the percentage change between the current month and the previous month. If there is an increase in questions, the trend is labeled "More questions posted," whereas a decline is labeled "Declining question activity." The API provides an icon to reflect the trend status.

**Total Answers Trend API (answers/total_answers_trend):**
This API monitors the number of answers provided on Flashcode. It counts the total number of answers and evaluates the percentage change between the current and previous months. If the number of answers has increased, the trend is marked as "More answers posted," and if it has declined, it is marked as "Declining answer activity." The API assigns an icon to represent the trend direction.

**Answer Rate API (answers/answer_rate):**
This API calculates the percentage of questions that have received at least one answer. It fetches the total number of questions and determines how many have been answered. Based on the answer rate percentage, it assigns a meaningful subtext such as "Many questions remain unanswered, improvement needed!" for rates below 50%, "Moderate engagement, but there's room to grow" for rates between 50% and 75%, and "Great community response rate!" for rates above 75%. The API also provides an icon indicating whether the engagement level is satisfactory.
