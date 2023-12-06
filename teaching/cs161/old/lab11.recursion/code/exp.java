public static int mystery0(int x, int y) {
	if (y == 0) {
		return 1;
	}
	return x * mystery0(x, y-1);
}
