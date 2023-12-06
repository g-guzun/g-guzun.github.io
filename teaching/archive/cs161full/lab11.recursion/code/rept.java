public static String mystery1(String s, int n)
{
    if (n == 0) {
        return "";
    }
    else if (n == 1) {
        return s;
    }
    else {
        return s + mystery1(s, n-1);
    }
}

