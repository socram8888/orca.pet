---
---

[← Back to companies](index.html#companies)

Adif
====

[Adif](http://www.adif.es/) is the state-owned company managing most of the train network through Spain.

Adif uses train-tierra through most of Iberian and mixed gauge network, with trains run mainly (but not exclusively) by [Renfe](https://renfe.com/).  Standard gauge lines use GSM-R generally.

Channels
--------

This list has been compiled by collating several information sources, such as the CNAF [^cnaf], 

Aside from a number, Adif also assigns a color to each channel, which is used to paint the roof of the repeater stations of each channel [^adifcolor].

<style>
.ralcolor {
	padding: 0.25em;
	border: black 1px solid;
}

.freqtbl tr th:nth-child(1) {
	width: 26%;
}

.freqtbl tr th:nth-child(2), .freqtbl tr th:nth-child(3) {
	width: 37%;
}

.freqtbl .shared {
	background-color: rgba(255, 255, 0, 0.25);
}
</style>

{% for channel in site.data.trentierra.adif.channels %}
### Channel {{ channel.number }}

  - Color: <span class="ralcolor" style="background-color: #{{ channel.color.hex }}; color: {{ channel.color.hex | textcolor }};">{{ channel.color.name }}</span>
  - Frequencies:

	<table class="freqtbl">
		<tr>
			<th>Subchannel</th>
			<th>Frequency</th>
			<th>Shared with</th>
		</tr>
		{% for freq in channel.subchannels %}
			<tr{% if freq[1].shared.size > 0 %} class="shared"{% endif %}>
				<td>{{ freq[0] | upcase }}</td>
				<td>{{ freq[1].frequency | precision: 3 }} MHz</td>
				<td>{{ freq[1].shared | join ', ' }}</td>
			</tr>
		{% endfor %}
	</table>
{% endfor %}

Footnotes
---------

[^adifcolor]: [ET 03.366.101.8 1st edition](casetas.pdf), page 9
[^cnaf]: [Notas UN](cnaf-un-2017.pdf), 2017 edition, UN-78
