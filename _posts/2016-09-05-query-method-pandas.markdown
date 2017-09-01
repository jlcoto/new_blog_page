---
layout: post
title:  "Panda's query method"
date:   2016-09-06 00:24:55 +0100
category: Data Analysis
tags: pandas
image: /img-post/query-large.jpg
---

Pandas is great when we need to select or filter our data  according to some criteria. Generally, no loops are needed. A clear statement of what we want is just enough.

While still experimental, pandas `query` method offers a simple way for making selections. The main advantage of this method, is that it allows writing cleaner and more readable code for getting the exact pieces of data you want. It also makes easier the task of index based selection.

In what follows, I give a brief overview of this method based on its documentation. If you want a thorough overview, [read the docs](http://pandas.pydata.org/pandas-docs/stable/indexing.html#the-query-method-experimental).

## Index based selection

Dealing with indices, is not an easy task. Indices are the main responsible for most of the speed and consistency that pandas offers (e.g. it makes sure that operations are for same observation). In the beginning, however, it might take some time to adjust to their logic.

Having used other statistical software, one of the things I could not get my head around was when I needed to use the index to filter the data according to some attribute. In the end, I would just convert the index into a column (or reset index) and go about with selections as I would regularly do with columns.

The good thing about the `query` method is that it allows users to make selections directly with indices. Say that you want to select those indices bigger than a column. Well, no need to reset your index and refer to the column. We can simply use `query`:

### Example Data

{% highlight python %}
#Original Dataset
example_df = pd.DataFrame(example_array, \
	    index=[1, 5, 6], columns=["A", "B", "C"])

	  +----+-----+-----+-----+
	  |    |   A |   B |   C |
	  |----+-----+-----+-----|
	  |  1 |   0 |   1 |   2 |
	  |  5 |   3 |   4 |   5 |
	  |  6 |   6 |   7 |   8 |
	  +----+-----+-----+-----+
{% endhighlight %}

### Using indices as conditions

{% highlight python %}
#Getting data where index is bigger than one column
example_df.query("index > A")

	  +----+-----+-----+-----+
	  |    |   A |   B |   C |
	  |----+-----+-----+-----|
	  |  1 |   0 |   1 |   2 |
	  |  5 |   3 |   4 |   5 |
	  +----+-----+-----+-----+

#Getting data with multiple conditions
example_df.query("index > A  & index > B")

	  +----+-----+-----+-----+
	  |    |   A |   B |   C |
	  |----+-----+-----+-----|
	  |  5 |   3 |   4 |   5 |
	  +----+-----+-----+-----+

{% endhighlight %}

The query method makes index selections very easy. You just need to refer to the index for comparisons. When your index has a name, you just refer to that name in your query statement.

The query method can also be applied to multi index data frames.

{% highlight python %}

#Multi Index data set
	  +------------+-----+-----+-----+
	  |            |   A |   B |   C |
	  |------------+-----+-----+-----|
	  | 'bar' | 1  |   0 |   1 |   2 |
	  | 'bar' | 5  |   3 |   4 |   5 |
	  | 'foo' | 6  |   6 |   7 |   8 |
	  +------------+-----+-----+-----+

{% endhighlight %}

In this case we have included another index level, with indices 'bar' and 'foo'. Say that you want to select only those observations corresponding to 'bar' and from those takes the ones whose second index is greater than the values in column B.

{% highlight python %}

#Selecting with multiple indices
mult_example.query('ilevel_0=="bar" &  ilevel_1 > B')

	  +------------+-----+-----+-----+
	  |            |   A |   B |   C |
	  |------------+-----+-----+-----|
	  |  'bar'| 5  |   3 |   4 |   5 |
	  +------------+-----+-----+-----+

{% endhighlight %}

Note that in case we have named our indices, we would replace "ilevel" for the corresponding index name. Also, take into account that in case the index has the same name as the column, the column will be given precedence. In other words, comparisons will be made with columns.

## Succinct syntax

Another advantage of the `query` method is that it makes our conditions more succinct and clear. For example, suppose we are checking the grades of a group of students and we are interested in finding out which students have shown increasing improvement in their grades. We will compare the regular and `query` way of performing this selection.

### Example Data

{% highlight python %}
#Students' data
+----+---------+----------+----------+----------+
|    | Names   |   Test_1 |   Test_2 |   Test_3 |
|----+---------+----------+----------+----------|
|  0 | John    |       76 |       64 |       97 |
|  1 | Thomas  |       56 |       59 |       95 |
|  2 | Jenny   |       89 |       90 |       99 |
|  3 | Tina    |       78 |       79 |      100 |
+----+---------+----------+----------+----------+
{% endhighlight %}


Checking for continuous progress:

{% highlight python %}
#Checking for conditions with "regular syntax"
grades_df[(grades_df.Test_1 < grades_df.Test_2) \
	& (grades_df.Test_2 < grades_df.Test_3)]

+----+---------+----------+----------+----------+
|    | Names   |   Test_1 |   Test_2 |   Test_3 |
|----+---------+----------+----------+----------|
|  1 | Thomas  |       56 |       59 |       95 |
|  2 | Jenny   |       89 |       90 |       99 |
|  3 | Tina    |       78 |       79 |      100 |
+----+---------+----------+----------+----------+

#Checking for conditions with `query` method Option 1
grades_df.query("Test_1 < Test_2 and Test_2 < Test_3")

+----+---------+----------+----------+----------+
|    | Names   |   Test_1 |   Test_2 |   Test_3 |
|----+---------+----------+----------+----------|
|  1 | Thomas  |       56 |       59 |       95 |
|  2 | Jenny   |       89 |       90 |       99 |
|  3 | Tina    |       78 |       79 |      100 |
+----+---------+----------+----------+----------+


#Checking for conditions with `query` method Option 2
grades_df.query("Test_1 < Test_2 < Test_3")

+----+---------+----------+----------+----------+
|    | Names   |   Test_1 |   Test_2 |   Test_3 |
|----+---------+----------+----------+----------|
|  1 | Thomas  |       56 |       59 |       95 |
|  2 | Jenny   |       89 |       90 |       99 |
|  3 | Tina    |       78 |       79 |      100 |
+----+---------+----------+----------+----------+
{% endhighlight %}

Unsurprisingly, all lines of code lead to the same result. Most important to notice, however, is how easy was to get this result with the `query` method.

In terms of comparison, a first thing to notice is that we do not use the parenthesis. The comparison operators in `query` have precedence over `and` and `or`. Furthermore, note that in the last example, we do not even need to use `and`. Personally, I find this makes the code very readable. As a result, the selection criteria is more clear, not only to the one performing the analysis, but also to people that will collaborate/read it.

There are many other things that are easier with `query`. For example, imagine that you want to filter your data according to if a value is present in a column. As before, I present the "regular" way to perform this and the one with `query`. I will use the grades data set presented before.


{% highlight python %}
#Checking if good grade in last exam "regular" syntax
grades_df[grades_df.Test_3.isin([98, 99, 100])]

+----+---------+----------+----------+----------+
|    | Names   |   Test_1 |   Test_2 |   Test_3 |
|----+---------+----------+----------+----------|
|  2 | Jenny   |       89 |       90 |       99 |
|  3 | Tina    |       78 |       79 |      100 |
+----+---------+----------+----------+----------+


#Checking if good grade in last exam "query" syntax
grades_df.query("Test_3 in [98, 99, 100]")

+----+---------+----------+----------+----------+
|    | Names   |   Test_1 |   Test_2 |   Test_3 |
|----+---------+----------+----------+----------|
|  2 | Jenny   |       89 |       90 |       99 |
|  3 | Tina    |       78 |       79 |      100 |
+----+---------+----------+----------+----------+
{% endhighlight %}


Again, the `query` syntax is more straightforward. Note that for selections based on particular values, it is possible to use `in/not in` or  `==/!=`. Both render the same results.

There are many other things one can do using `query`. I hope this has whet your appetite. As usual, you can check the docs to discover all its uses.

To recap, the `query` method:

- Makes data selections succinct and easier to read.
- Selections based on indices are straightforward and do not need further operations (e.g. converting index to columns).

<div class="text-right">
	<em>Happy querying!</em>
</div>
















