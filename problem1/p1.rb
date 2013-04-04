start = Time.now 

def d(n) #method to find the sum of divisors.
  sum = 1
  2.upto(Math.sqrt(n)) do |i| # upper bound for the sieve
    sum += i + (n / i) if (n % i == 0) # factorise and add.
  end
  return sum #returns the sum
end

sum = 0
final = [] # array to store the final value

1.upto(100000) do |i| # the counter
  num_divisors = d(i) 
  if d(num_divisors) == i && i != num_divisors #implemented the main condition here
  	puts i 
	  # sum += i 
    #final << i #add number to the array.
  end
end

# puts sum 

end_time = Time.now 
puts "Total Time: " + (end_time - start).to_s + " seconds." 

# There's a super complicated algorithm that Ramanujan came up for precisely the same problem but its one of the most efficient ways to find divisors. Its a little too deep and complicated to grok though. 
