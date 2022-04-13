import numpy as np
import numpy.linalg as la

import simplex


def diff_is_zero(z1, z2):
    try:
        if np.abs(z1-z2) < 1e-10:
            return True
        else:
            return False
    except:
        return False


def norm_diff_is_zero(y1, y2):
    try:
        if la.norm(y1-y2) < 1e-10:
            return True
        else:
            return False
    except:
        return False


def testcase(tup, correctVal, k):
    if tup[0] == correctVal[0] and tup[1] == correctVal[1]:
        if correctVal[1] == False and tup[2] is None and tup[3] is None:
            print('Test case {} Successful :-D'.format(k))
            return 1
        elif diff_is_zero(tup[2], correctVal[2]) and norm_diff_is_zero(tup[3], correctVal[3]):
            print('Test case {} Successful :-D'.format(k))
            return 1
    print('Test case {} Unsuccesful :-/'.format(k))
    return 0


cases_passed = 0


# Case 1

A = np.array([[-6, 0, 1, -2, 2], [3, 1, -1, 8, 1]], dtype=np.float)
b = np.array([[6], [9]], dtype=np.float)
c = np.array([-4, 1, 1, 7, 3], dtype=np.float)


tup = simplex(A, b, c)
correctVal = (True, True, 14, np.array([1, 0, 0, 0, 6], dtype=np.float))
cases_passed += testcase(tup, correctVal, 1)


# Case 2

A = np.array([[1, -2, -3, -2], [1, -1, 2, 1]], dtype=np.float)
b = np.array([[3], [11]], dtype=np.float)
c = np.array([2, -3, 1, 1], dtype=np.float)


tup = simplex(A, b, c)
correctVal = (True, True, 14, np.array([19, 8, 0, 0], dtype=np.float))
cases_passed += testcase(tup, correctVal, 2)

# Case 3

A = np.array([[-1, 2, 1, 1, 0], [-1, 0, 2, 0, -1],
             [1, -1, 2, 0, 0]], dtype=np.float)
b = np.array([[1], [4], [4]], dtype=np.float)
c = np.array([1, 1, 1, 0, 0], dtype=np.float)


tup = simplex(A, b, c)
correctVal = (False, False, None, None)
cases_passed += testcase(tup, correctVal, 3)

# Case 4

A = np.array([[1, 1, -2, 1, 0], [-3, 1, 2, 0, 1]], dtype=np.float)
b = np.array([[7], [3]], dtype=np.float)
c = np.array([0, -2, -1, 0, 0], dtype=np.float)


tup = simplex(A, b, c)
correctVal = (True, False, None, None)
cases_passed += testcase(tup, correctVal, 4)

# Case 5

A = np.array([[1, -2, 3, 1], [-1, 1, 2, 2./3]], dtype=np.float)
b = np.array([[6], [4]], dtype=np.float)
c = np.array([2, -1, 1, 0], dtype=np.float)


tup = simplex(A, b, c)
correctVal = (True, True, 0, np.array([0, 0, 0, 6], dtype=np.float))
cases_passed += testcase(tup, correctVal, 5)

# Case 6

A = np.array([[1, 2, 0, 1], [2, 1, 1, 0], [-1, 4, -2, 3]], dtype=np.float)
b = np.array([[20], [10], [40]], dtype=np.float)
c = np.array([1, 4, 3, 2], dtype=np.float)


tup = simplex(A, b, c)
correctVal = (True, True, 35, np.array([5, 0, 0, 15], dtype=np.float))
cases_passed += testcase(tup, correctVal, 6)

# Case 7

A = np.array([[1, 0, 0, 1./4, -8, -1, 9], [0, 1, 0, 1./2, -
             12, -1./2, 3], [0, 0, 1, 0, 0, 1, 0]], dtype=np.float)
b = np.array([[0], [0], [1]], dtype=np.float)
c = np.array([0, 0, 0, -3./4, 20, -1./2, 6], dtype=np.float)


tup = simplex(A, b, c)
correctVal = (True, True, -1.25,
              np.array([.75, 0, 0, 1, 0, 1, 0], dtype=np.float))
cases_passed += testcase(tup, correctVal, 7)

percent_passed = 100*cases_passed/7.
points_earned = int(50*cases_passed/7.)

print('You passed {:.2f}% of the test cases and earned {} out of 50 points'.format(
    percent_passed, points_earned))
