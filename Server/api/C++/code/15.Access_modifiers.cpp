#include <iostream>
using namespace std;

// Public
class myclass1
{
public:
	myfun()
	{
		cout << "This is public" << endl;
	}
};

// Private
class myclass2
{
private:
	double radious;

public:
	double area(double r)
	{
		radious = r;
		return 3.14 * radious * radious;
	}
};

//Protected
class parent
{
protected:
	int no;
};

class child : public parent
{
public:
	void setId(int number)
	{
		no = number;
	}
	void message()
	{
		cout << "Your number is :" << no << endl;
	}
};

int main()
{
	// public
	myclass1 obj1;
	obj1.myfun();

	// private
	myclass2 obj2;

	cout << "Area is :" << obj2.area(15) << endl;

	// Protected
	child obj3;
	obj3.setId(80);
	obj3.message();
}