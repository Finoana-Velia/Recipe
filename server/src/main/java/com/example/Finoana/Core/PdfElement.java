package com.example.Finoana.Core;

import lombok.Data;
import lombok.Builder;

import com.lowagie.text.Element;
import com.lowagie.text.Font;
import com.lowagie.text.Paragraph;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PdfElement {

	private String text;
	private Font font;
	private int fontSize;
	private int align;
}
