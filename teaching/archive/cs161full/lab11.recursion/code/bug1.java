public static void ascendingPrint(int n) {
    int i = 0;
    if (i <= n) {
        System.out.println(i);
        i++;
        ascendingPrint(n-1);
    }
}
