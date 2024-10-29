#include<iostream>
using namespace std;
class myclass{
	public:
		//Pointer as member variable
		void create(){
			int x=100;
			int *ptr=&x;
			
			cout<<"Value of x is :"<<x<<endl;
			cout<<"Address of X is :"<<ptr<<endl;
		}
		void point(){
			cout<<"Copy of object is successfully"<<endl;
		}
};
int main(){
	myclass a1;
	a1.create();
	myclass *ptr=&a1;
	ptr->point();
	
}
