#include<iostream>
using namespace std;
class myclass{
	public:
		class nested{
			public:
			int num(){
				cout << "This function inner nested class"<<endl;
			}
		};
};
int main(){
	//Access nested class
	myclass::nested obj;
	obj.num();
}
