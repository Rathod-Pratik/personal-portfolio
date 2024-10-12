#include <iostream>
using namespace std;

class dynamic  {
	int* ptr;

public:
	dynamic ()
	{

		ptr = new int;
		*ptr = 105;
	}

	void display()
	{
		cout << *ptr << endl;
	}
};


int main()
{
	dynamic  obj1;

	obj1.display();

	return 0;
}
