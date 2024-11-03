#include<iostream>
#include<string>
using namespace std;
int myfun(){
	class myclass{
		public:
			string message= "This is local class";
	};
	myclass p;
	cout << p.message<<endl;
}
int main(){
	myfun();	
}
