public static void skipPrint(int n) {
    if (n == 0) {
        System.out.println(0);
    }
    else {
        System.out.println(n);
        skipPrint(n-2);
    }
}
