public static int mystery2(int i, int j) {
    if (i == 0) {
        return j;
    }
    else {
        return mystery2(i-1, j+1);
    }
}
